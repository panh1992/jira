import { useState, useEffect, useRef } from "react";

export const isFalsy = (v: unknown) => (v === 0 ? false : !v);
export const isVoid = (v: unknown) => v === undefined || v === null || v === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };

  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化后, 设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay || 0);
    /**
     * useEffect的return函数相当于componentWillUnmount, 做一些清理的任务
     * 在delay时间内clearTimeout(timeout)是清除之前的定时器
     * return函数:页面卸载时执行, 或者执行本次effect时清除上一次执行的effect
     */
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

// 重置路由并刷新页面
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 返回组件的挂载状态,
 * 如果还没挂载过已经挂载返回false , 反之true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
