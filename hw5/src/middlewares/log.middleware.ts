/* eslint-disable @typescript-eslint/no-this-alias */
export class CustomLogger {
  private serviceName: string;
  constructor(name: string) {
    this.serviceName = name;
  }

  public log() {
    const self = this;
    return (req, res, next) => {
      try {
        console.log(self.serviceName);
        next();
      } catch (e) {
        console.log(e)
      }

    }
  }
}