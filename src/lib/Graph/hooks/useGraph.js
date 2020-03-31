import { Context } from '../components/Graph';
import { useContext } from 'react';

function useGraph() {
  return useContext(Context);
}

export default useGraph;
