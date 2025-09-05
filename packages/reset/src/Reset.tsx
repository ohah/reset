import { useEffect, useState } from "react";
import { subscribeReset, subscribeResetGroup } from "./resetBus";

type Props<T extends string, G extends string = never> = {
  id: T;
  groups?: G[];
  children: (reset: () => void, key: number) => React.ReactNode;
};

export const Reset = <T extends string, G extends string = never>({ 
  id, 
  groups = [], 
  children 
}: Props<T, G>) => {
  const [key, setKey] = useState(0);
  const reset = () => setKey((k) => k + 1);

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    // ID 기반 구독 (항상 필수)
    unsubscribers.push(subscribeReset(id, reset));
    
    // 그룹 기반 구독들 (groups가 있을 때만)
    if (groups.length > 0) {
      const unsubscribeGroups = groups.map(groupId => 
        subscribeResetGroup(groupId, reset)
      );
      unsubscribers.push(...unsubscribeGroups);
    }

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [id, groups]);

  return <>{children(reset, key)}</>;
};
