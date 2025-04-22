import { Optimizer } from "@parcel/plugin";
// import jsConfuser from "./steps/js-confuser";
import javascriptObfuscator from "./steps/js-obfuscator";

const steps = [javascriptObfuscator];

export default new Optimizer({
  async optimize({ contents, map, bundle }) {
    let code = contents.toString();
    code = code.replace(/node:/g, "");

    if (!bundle.env.shouldOptimize) {
      return { contents: code, map };
    }

    const isBrowser = bundle.env.isBrowser();
    for (const step of steps) code = await step(code, isBrowser);

    return { contents: code };
  },
});
