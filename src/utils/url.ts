import { cleanObject, subset } from "utils";
import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

// 返回页面url中, 指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateKeys] = useState(keys);
  return [
    /**
     * useMemo: 监听searchParams的值, 改变时, 在执行函数,
     * (js是对象比较是地址比较, 比如相同的对象, 地址不同使用useState会执行函数,
     *  useMemo是比较值,值相同时,不执行函数)
     */
    useMemo(
      () =>
        // as:类型转换
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // 此处须看 iterator
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};
