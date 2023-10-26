
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/SearchbarMobile.tsx";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarFixed({ searchbar }: Props) {

  
  if (!searchbar) { 
    return null;
  }

  return (
    
    
    <div
        class=" flex lg:px-0 px-3 w-full justify-center  "
        
      >
        <Searchbar {...searchbar} />
      </div>

  );
}

export default SearchbarFixed;
