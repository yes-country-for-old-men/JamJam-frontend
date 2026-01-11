import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@assets/icons/search.svg?react';
import theme from '@styles/theme';
import * as S from './SearchBar.styles';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = '필요한 손길을 찾아보세요',
  className,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    value || searchParams.get('keyword') || '',
  );
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <S.SearchContainer className={className} isFocused={isSearchFocused}>
      <S.SearchInput
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
      <S.SearchButton onClick={handleSearch}>
        <SearchIcon fill={theme.COLORS.MAIN.PRIMARY} />
      </S.SearchButton>
    </S.SearchContainer>
  );
};

export default SearchBar;
