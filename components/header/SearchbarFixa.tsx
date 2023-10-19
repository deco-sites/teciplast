import { headerHeight } from "$store/components/header/constants.ts";
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
        class=" bg-base-100 container flex justify-center items-center"
        
      >
        <Searchbar {...searchbar} />
      </div>
  );
}

export default SearchbarFixed;
