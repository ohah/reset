import mitt from "mitt";

type Events = {
  reset: string;
  resetGroup: string;
  sync: string;
};

const bus = mitt<Events>();

// ID 기반 리셋
export const resetById = <T extends string>(id: T) => {
  bus.emit("reset", id);
};

// 그룹 기반 리셋
export const resetByGroup = <T extends string>(groupId: T) => {
  bus.emit("resetGroup", groupId);
};

// ID 구독
export const subscribeReset = <T extends string>(id: T, cb: () => void) => {
  const handler = (targetId: string) => {
    if (targetId === id) cb();
  };
  bus.on("reset", handler);
  return () => bus.off("reset", handler);
};

// 그룹 구독
export const subscribeResetGroup = <T extends string>(groupId: T, cb: () => void) => {
  const handler = (targetGroupId: string) => {
    if (targetGroupId === groupId) cb();
  };
  bus.on("resetGroup", handler);
  return () => bus.off("resetGroup", handler);
};

// 동기화 트리거 (특정 컴포넌트가 리렌더링될 때 다른 컴포넌트들도 함께 리렌더링)
export const triggerSync = <T extends string>(id: T) => {
  bus.emit("sync", id);
};

// 동기화 구독 (다른 컴포넌트의 리렌더링을 감지)
export const subscribeSync = <T extends string>(id: T, cb: () => void) => {
  const handler = (targetId: string) => {
    if (targetId === id) {
      cb();
    }
  };
  bus.on("sync", handler);
  return () => {    
    bus.off("sync", handler);
  };
};