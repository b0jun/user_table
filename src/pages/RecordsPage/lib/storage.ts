import { Record } from '../types';

interface Storage {
  get(): Record[];
  save(records: Record[]): void;
}

// * InMemoryStorage 클래스
class InMemoryStorage implements Storage {
  private records: Record[] = [];

  get(): Record[] {
    return this.records;
  }

  save(records: Record[]): void {
    this.records = records;
  }
}

// * LocalStorage 클래스
class LocalStorage implements Storage {
  private readonly STORAGE_KEY = 'records';

  get(): Record[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('LocalStorage 불러오기 실패:', error);
      return [];
    }
  }

  save(records: Record[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error('LocalStorage 저장 실패:', error);
    }
  }
}

const STORAGE_MODE = import.meta.env.VITE_STORAGE || 'in-memory';
export const storage: Storage = STORAGE_MODE === 'local-storage' ? new LocalStorage() : new InMemoryStorage();
