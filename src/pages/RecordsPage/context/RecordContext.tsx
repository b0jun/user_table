import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { storage } from '../lib/storage';
import { initialRecords } from '../lib/data';
import { Record } from '../types';

interface RecordState {
  records: Record[];
  selectedRowKeys: React.Key[];
}

interface RecordActions {
  setRecords: (records: Record[]) => void;
  setSelectedRowKeys: (keys: React.Key[]) => void;
  addRecord: (newRecord: Omit<Record, 'id'>) => void;
  deleteRecord: (id: string) => void;
  deleteSelectedRecords: () => void;
  updateRecord: (values: Record) => void;
}

const RecordStateContext = createContext<RecordState | undefined>(undefined);
const RecordActionsContext = createContext<RecordActions | undefined>(undefined);

interface RecordProviderProps {
  children: ReactNode;
}

export function RecordProvider({ children }: RecordProviderProps) {
  const [records, setRecords] = useState<Record[]>(initialRecords);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const savedRecords = storage.get();
    if (savedRecords.length === 0 && initialRecords) {
      storage.save(initialRecords);
      setRecords(initialRecords);
    } else {
      setRecords(savedRecords);
    }
  }, []);

  // * 레코드 추가
  const addRecord = useCallback((newRecord: Omit<Record, 'id'>) => {
    const id = crypto.randomUUID();
    setRecords((prevRecords) => {
      const updatedRecords = [...prevRecords, { ...newRecord, id }];
      storage.save(updatedRecords);
      return updatedRecords;
    });
  }, []);

  // * 레코드 삭제
  const deleteRecord = useCallback((id: string) => {
    setRecords((prevRecords) => {
      const updatedRecords = prevRecords.filter((record) => record.id !== id);
      storage.save(updatedRecords);
      return updatedRecords;
    });
  }, []);

  // * 선택된 레코드 삭제
  const deleteSelectedRecords = useCallback(() => {
    setRecords((prevRecords) => {
      const updatedRecords = prevRecords.filter((record) => !selectedRowKeys.includes(record.id));
      storage.save(updatedRecords);
      return updatedRecords;
    });
    setSelectedRowKeys([]);
  }, [selectedRowKeys]);

  // * 레코드 업데이트
  const updateRecord = useCallback((updatedRecord: Record) => {
    setRecords((prevRecords) => {
      const updatedRecords = prevRecords.map((r) => (r.id === updatedRecord.id ? { ...r, ...updatedRecord } : r));
      storage.save(updatedRecords);
      return updatedRecords;
    });
  }, []);

  const state = useMemo(
    () => ({
      records,
      selectedRowKeys,
    }),
    [records, selectedRowKeys],
  );

  const actions = useMemo(
    () => ({
      setRecords,
      setSelectedRowKeys,
      addRecord,
      deleteRecord,
      deleteSelectedRecords,
      updateRecord,
    }),
    [setRecords, setSelectedRowKeys, addRecord, deleteRecord, deleteSelectedRecords, updateRecord],
  );

  return (
    <RecordStateContext.Provider value={state}>
      <RecordActionsContext.Provider value={actions}>{children}</RecordActionsContext.Provider>
    </RecordStateContext.Provider>
  );
}

export function useRecordState() {
  const context = useContext(RecordStateContext);
  if (!context) {
    throw new Error('useRecordState must be used within a RecordProvider');
  }
  return context;
}

export function useRecordActions() {
  const context = useContext(RecordActionsContext);
  if (!context) {
    throw new Error('useRecordActions must be used within a RecordProvider');
  }
  return context;
}
