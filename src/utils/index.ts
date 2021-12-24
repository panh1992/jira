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
    // 每次在上一个useEffect 处理完以后再运行
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
