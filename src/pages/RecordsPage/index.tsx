import RecordHeader from './components/RecordHeader';
import RecordTable from './components/RecordTable';
import { RecordProvider } from './context/RecordContext';

export function RecordsPage() {
  return (
    <RecordProvider>
      <RecordHeader />
      <RecordTable />
    </RecordProvider>
  );
}
