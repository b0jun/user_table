import { ModalOverlayProvider } from '../../context/ModalOverlayProvider';
import RecordHeader from './components/RecordHeader';
import RecordTable from './components/RecordTable';
import { RecordProvider } from './context/RecordContext';

export function RecordsPage() {
  return (
    <RecordProvider>
      <ModalOverlayProvider>
        <RecordHeader />
        <RecordTable />
      </ModalOverlayProvider>
    </RecordProvider>
  );
}
