var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { PromiseWrapper, EventEmitter } from 'angular2/src/facade/async';
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { isBlank, isPresent } from 'angular2/src/facade/lang';
import { Directive, Attribute, ComponentResolver, ComponentFactory, ViewContainerRef, Output, MapInjector } from 'angular2/core';
import * as routerMod from '../router';
import { RouteParams, RouteData } from '../instruction';
import * as hookMod from '../lifecycle/lifecycle_annotations';
import { hasLifecycleHook } from '../lifecycle/route_lifecycle_reflector';
let _resolveToTrue = PromiseWrapper.resolve(true);
/**
 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
 *
 * ## Use
 *
 * ```
 * <router-outlet></router-outlet>
 * ```
 */
export let RouterOutlet = class RouterOutlet {
    constructor(_viewContainerRef, _loader, _parentRouter, nameAttr) {
        this._viewContainerRef = _viewContainerRef;
        this._loader = _loader;
        this._parentRouter = _parentRouter;
        this.name = null;
        this._componentRef = null;
        this._currentInstruction = null;
        this.activateEvents = new EventEmitter();
        if (isPresent(nameAttr)) {
            this.name = nameAttr;
            this._parentRouter.registerAuxOutlet(this);
        }
        else {
            this._parentRouter.registerPrimaryOutlet(this);
        }
    }
    /**
     * Called by the Router to instantiate a new component during the commit phase of a navigation.
     * This method in turn is responsible for calling the `routerOnActivate` hook of its child.
     */
    activate(nextInstruction) {
        var previousInstruction = this._currentInstruction;
        this._currentInstruction = nextInstruction;
        var componentType = nextInstruction.componentType;
        var childRouter = this._parentRouter.childRouter(componentType);
        var providers = new Map();
        providers.set(RouteData, nextInstruction.routeData);
        providers.set(RouteParams, new RouteParams(nextInstruction.params));
        providers.set(routerMod.Router, childRouter);
        var injector = new MapInjector(this._viewContainerRef.parentInjector, providers);
        var componentFactoryPromise;
        if (componentType instanceof ComponentFactory) {
            componentFactoryPromise = PromiseWrapper.resolve(componentType);
        }
        else {
            componentFactoryPromise = this._loader.resolveComponent(componentType);
        }
        this._componentRef =
            componentFactoryPromise.then((componentFactory) => this._viewContainerRef.createComponent(componentFactory, 0, injector));
        return this._componentRef.then((componentRef) => {
            this.activateEvents.emit(componentRef.instance);
            if (hasLifecycleHook(hookMod.routerOnActivate, componentRef.instance)) {
                return componentRef.instance
                    .routerOnActivate(nextInstruction, previousInstruction);
            }
            else {
                return componentRef;
            }
        });
    }
    /**
     * Called by the {@link Router} during the commit phase of a navigation when an outlet
     * reuses a component between different routes.
     * This method in turn is responsible for calling the `routerOnReuse` hook of its child.
     */
    reuse(nextInstruction) {
        var previousInstruction = this._currentInstruction;
        this._currentInstruction = nextInstruction;
        // it's possible the component is removed before it can be reactivated (if nested withing
        // another dynamically loaded component, for instance). In that case, we simply activate
        // a new one.
        if (isBlank(this._componentRef)) {
            return this.activate(nextInstruction);
        }
        else {
            return this._componentRef.then((ref) => hasLifecycleHook(hookMod.routerOnReuse, ref.instance) ?
                ref.instance.routerOnReuse(nextInstruction, previousInstruction) :
                true);
        }
    }
    /**
     * Called by the {@link Router} when an outlet disposes of a component's contents.
     * This method in turn is responsible for calling the `routerOnDeactivate` hook of its child.
     */
    deactivate(nextInstruction) {
        var next = _resolveToTrue;
        if (isPresent(this._componentRef)) {
            next = this._componentRef.then((ref) => hasLifecycleHook(hookMod.routerOnDeactivate, ref.instance) ?
                ref.instance
                    .routerOnDeactivate(nextInstruction, this._currentInstruction) :
                true);
        }
        return next.then((_) => {
            if (isPresent(this._componentRef)) {
                var onDispose = this._componentRef.then((ref) => ref.destroy());
                this._componentRef = null;
                return onDispose;
            }
        });
    }
    /**
     * Called by the {@link Router} during recognition phase of a navigation.
     *
     * If this resolves to `false`, the given navigation is cancelled.
     *
     * This method delegates to the child component's `routerCanDeactivate` hook if it exists,
     * and otherwise resolves to true.
     */
    routerCanDeactivate(nextInstruction) {
        if (isBlank(this._currentInstruction)) {
            return _resolveToTrue;
        }
        return this._componentRef.then((ref) => hasLifecycleHook(hookMod.routerCanDeactivate, ref.instance) ?
            ref.instance
                .routerCanDeactivate(nextInstruction, this._currentInstruction) :
            true);
    }
    /**
     * Called by the {@link Router} during recognition phase of a navigation.
     *
     * If the new child component has a different Type than the existing child component,
     * this will resolve to `false`. You can't reuse an old component when the new component
     * is of a different Type.
     *
     * Otherwise, this method delegates to the child component's `routerCanReuse` hook if it exists,
     * or resolves to true if the hook is not present.
     */
    routerCanReuse(nextInstruction) {
        var result;
        if (isBlank(this._currentInstruction) ||
            this._currentInstruction.componentType != nextInstruction.componentType) {
            result = PromiseWrapper.resolve(false);
        }
        else {
            result = this._componentRef.then((ref) => {
                if (hasLifecycleHook(hookMod.routerCanReuse, ref.instance)) {
                    return ref.instance.routerCanReuse(nextInstruction, this._currentInstruction);
                }
                else {
                    return nextInstruction == this._currentInstruction ||
                        (isPresent(nextInstruction.params) && isPresent(this._currentInstruction.params) &&
                            StringMapWrapper.equals(nextInstruction.params, this._currentInstruction.params));
                }
            });
        }
        return result;
    }
    ngOnDestroy() { this._parentRouter.unregisterPrimaryOutlet(this); }
};
__decorate([
    Output('activate'), 
    __metadata('design:type', Object)
], RouterOutlet.prototype, "activateEvents", void 0);
RouterOutlet = __decorate([
    Directive({ selector: 'router-outlet' }),
    __param(3, Attribute('name')), 
    __metadata('design:paramtypes', [ViewContainerRef, ComponentResolver, routerMod.Router, String])
], RouterOutlet);