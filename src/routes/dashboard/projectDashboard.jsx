import { useEffect,useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import Projectspreview from './projectspreview';

const ProjectDashboard = () => {
const [assignmentDocID,setAssignmentDocID] =useState('')
const { arrayOfDocID, error } = useCollection("assignments");

    return (
    <div>
    <h1> hI Hihsh isdfhs </h1>
{arrayOfDocID.length>0 &&
 arrayOfDocID.map((id)=>(
<Projectspreview 
assignmentDocID={id}
/>
))}
</div>
    );
};

export default ProjectDashboard;