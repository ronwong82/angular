import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { ComponentFactory } from 'angular2/core';
import { reflector } from 'angular2/src/core/reflection/reflection';
import { CanActivate } from './lifecycle/lifecycle_annotations_impl';
export class TouchMap {
    constructor(map) {
        this.map = {};
        this.keys = {};
        if (isPresent(map)) {
            StringMapWrapper.forEach(map, (value, key) => {
                this.map[key] = isPresent(value) ? value.toString() : null;
                this.keys[key] = true;
            });
        }
    }
    get(key) {
        StringMapWrapper.delete(this.keys, key);
        return this.map[key];
    }
    getUnused() {
        var unused = {};
        var keys = StringMapWrapper.keys(this.keys);
        keys.forEach(key => unused[key] = StringMapWrapper.get(this.map, key));
        return unused;
    }
}
export function normalizeString(obj) {
    if (isBlank(obj)) {
        return null;
    }
    else {
        return obj.toString();
    }
}
export function getComponentAnnotations(comp) {
    if (comp instanceof ComponentFactory) {
        return comp.metadata;
    }
    else {
        return reflector.annotations(comp);
    }
}
export function getComponentType(comp) {
    return comp instanceof ComponentFactory ? comp.componentType : comp;
}
export function getCanActivateHook(component) {
    var annotations = getComponentAnnotations(component);
    for (let i = 0; i < annotations.length; i += 1) {
        let annotation = annotations[i];
        if (annotation instanceof CanActivate) {
            return annotation.fn;
        }
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUtqT0g0VFI1LnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBTyxNQUFNLDBCQUEwQjtPQUMxRCxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDO09BQ3hELEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlO09BQ3ZDLEVBQUMsU0FBUyxFQUFDLE1BQU0seUNBQXlDO09BQzFELEVBQUMsV0FBVyxFQUFDLE1BQU0sd0NBQXdDO0FBRWxFO0lBSUUsWUFBWSxHQUF5QjtRQUhyQyxRQUFHLEdBQTRCLEVBQUUsQ0FBQztRQUNsQyxTQUFJLEdBQTZCLEVBQUUsQ0FBQztRQUdsQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRztnQkFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXO1FBQ2IsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLE1BQU0sR0FBeUIsRUFBRSxDQUFDO1FBQ3RDLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0FBQ0gsQ0FBQztBQUdELGdDQUFnQyxHQUFRO0lBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQztBQUNILENBQUM7QUFFRCx3Q0FBd0MsSUFBNkI7SUFDbkUsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0FBQ0gsQ0FBQztBQUVELGlDQUFpQyxJQUE2QjtJQUM1RCxNQUFNLENBQUMsSUFBSSxZQUFZLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ3RFLENBQUM7QUFFRCxtQ0FBbUMsU0FBUztJQUMxQyxJQUFJLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQy9DLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge0NhbkFjdGl2YXRlfSBmcm9tICcuL2xpZmVjeWNsZS9saWZlY3ljbGVfYW5ub3RhdGlvbnNfaW1wbCc7XG5cbmV4cG9ydCBjbGFzcyBUb3VjaE1hcCB7XG4gIG1hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAga2V5czoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge307XG5cbiAgY29uc3RydWN0b3IobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIGlmIChpc1ByZXNlbnQobWFwKSkge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKG1hcCwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgdGhpcy5tYXBba2V5XSA9IGlzUHJlc2VudCh2YWx1ZSkgPyB2YWx1ZS50b1N0cmluZygpIDogbnVsbDtcbiAgICAgICAgdGhpcy5rZXlzW2tleV0gPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmRlbGV0ZSh0aGlzLmtleXMsIGtleSk7XG4gICAgcmV0dXJuIHRoaXMubWFwW2tleV07XG4gIH1cblxuICBnZXRVbnVzZWQoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHZhciB1bnVzZWQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgdmFyIGtleXMgPSBTdHJpbmdNYXBXcmFwcGVyLmtleXModGhpcy5rZXlzKTtcbiAgICBrZXlzLmZvckVhY2goa2V5ID0+IHVudXNlZFtrZXldID0gU3RyaW5nTWFwV3JhcHBlci5nZXQodGhpcy5tYXAsIGtleSkpO1xuICAgIHJldHVybiB1bnVzZWQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplU3RyaW5nKG9iajogYW55KTogc3RyaW5nIHtcbiAgaWYgKGlzQmxhbmsob2JqKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50QW5ub3RhdGlvbnMoY29tcDogVHlwZSB8IENvbXBvbmVudEZhY3RvcnkpOiBhbnlbXSB7XG4gIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcG9uZW50RmFjdG9yeSkge1xuICAgIHJldHVybiBjb21wLm1ldGFkYXRhO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWZsZWN0b3IuYW5ub3RhdGlvbnMoY29tcCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudFR5cGUoY29tcDogVHlwZSB8IENvbXBvbmVudEZhY3RvcnkpOiBUeXBlIHtcbiAgcmV0dXJuIGNvbXAgaW5zdGFuY2VvZiBDb21wb25lbnRGYWN0b3J5ID8gY29tcC5jb21wb25lbnRUeXBlIDogY29tcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhbkFjdGl2YXRlSG9vayhjb21wb25lbnQpOiBGdW5jdGlvbiB7XG4gIHZhciBhbm5vdGF0aW9ucyA9IGdldENvbXBvbmVudEFubm90YXRpb25zKGNvbXBvbmVudCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBsZXQgYW5ub3RhdGlvbiA9IGFubm90YXRpb25zW2ldO1xuICAgIGlmIChhbm5vdGF0aW9uIGluc3RhbmNlb2YgQ2FuQWN0aXZhdGUpIHtcbiAgICAgIHJldHVybiBhbm5vdGF0aW9uLmZuO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIl19