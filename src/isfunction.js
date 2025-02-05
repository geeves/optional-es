import {isNotnull} from "./isnull";

const isfunction = (func) => true === isNotnull(func) && "function" === typeof func;

const isNotfunction = (func) => false === isfunction(func);

export {isfunction, isNotfunction};
