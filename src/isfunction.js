import {isnotnull} from "./isnull";

const isfunction = (func) => true === isnotnull(func) && "function" === typeof func;

const isnotfunction = (func) => false === isfunction(func);

export {isfunction, isnotfunction};
