import React from 'react'
import Header from './sections/Header'
import Filter from './sections/Filter'
import WorkHistory from './sections/WorkHistory'

const index = () => {
  return (
    <>
    <Header/>
    <Filter/>
    <WorkHistory/>  
    </>
  )
}

export default index



// import { FilterProvider } from "../context/FilterContext";
// import Filter from "./sections/Filter";
// import WorkHistory from "./WorkHistory";

// export default function WorkHistoryPage() {
//   return (
//     <FilterProvider>
//       <Filter />
//       <WorkHistory />
//     </FilterProvider>
//   );
// }
