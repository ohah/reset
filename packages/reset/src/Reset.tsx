import React, { useEffect, useState } from "react";
import { subscribeReset, subscribeResetGroup, subscribeSync, triggerSync, registerId, unregisterId } from "./resetBus";

type Props = {
  id: string;
  groups?: string[];
  syncWith?: string[];
  children: (reset: () => void, key: number) => React.ReactNode;
};

export const Reset = ({
  id,
  groups = [],
  syncWith = [],
  children
}: Props) => {
  const [key, setKey] = useState(0);
  const reset = () => {
    setKey((k) => k + 1);
    // reset 함수 호출 시 자동으로 동기화 트리거
    triggerSync(id);
  };

  // 컴포넌트가 리렌더링될 때마다 동기화 트리거 (상태 변경 감지)
  useEffect(() => {
    triggerSync(id);
  });

  useEffect(() => {
    // 아이디 등록 및 중복 체크
    registerId(id);

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

    // 동기화 구독들 (syncWith가 있을 때만)
    if (syncWith.length > 0) {
      const unsubscribeSyncs = syncWith.map(syncId => 
        subscribeSync(syncId, reset)
      );
      unsubscribers.push(...unsubscribeSyncs);
    }

    return () => {
      // 컴포넌트 언마운트 시 아이디 해제
      unregisterId(id);
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [id, groups, syncWith]);

  return <>{children(reset, key)}</>;
};

