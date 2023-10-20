
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/SearchbarDesktop.tsx";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarFixed({ searchbar }: Props) {

  
  if (!searchbar) { 
    return null;
  }

  return (
    
    
    <div
        class=" flex w-full justify-center  "
        
      >
        <Searchbar {...searchbar} />
      </div>

  );
}

export default SearchbarFixed;
