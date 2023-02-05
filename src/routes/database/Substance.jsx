import { useEffect } from 'react';
import { useDocument } from '../../hooks/useDocument';
import MonographList from "./MonographList";
const Substance = ({ substanceId, closeCreateSubstanceComp }) => {
useEffect(() => {
  closeCreateSubstanceComp();
}, [closeCreateSubstanceComp]);
  const { error, document } = useDocument("substances", substanceId);
  return (
    <div className="substance-container">
      {!error && (
        <>
         <MonographList document={document} id={substanceId} />
        </>
      )}
    </div>
  );
};

export default Substance;