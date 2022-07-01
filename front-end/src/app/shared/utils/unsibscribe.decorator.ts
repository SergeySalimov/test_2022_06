export interface UnsubscribeConfig {
  ignore?: Array<string|Symbol>,
  showConfig?: boolean,
}

export const Unsubscribe = (config: UnsubscribeConfig = { ignore: [], showConfig: false }): ClassDecorator => {
  return (constructor: any) => {
    const original = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      for (let prop in this) {
        const property = this[prop];
        ///@ts-ignore
        if (!config.ignore?.includes(prop)) {
          if (property && (typeof property.unsubscribe === "function")) {
            try {
              if (config.showConfig) console.info(`%c PLUnsubscribe -  Class:   ${constructor.name} unsubscriber: ${prop} `, `color: green `);
              property.unsubscribe();
            } catch (error) {
              console.error(`%c PLUnsubscribe -  Class:  ${constructor.name}  unsubscriber: ${prop} ERROR: `, `color: red `, error || "");
            }
          }
        }
        if (config.showConfig) console.info(`%c PLUnsubscribe -  Class:   ${constructor.name} unsubscriber IGNORED: ${prop} `, `color: blue `);
      }
      if (original) original.apply(this);
    };

  }
}
