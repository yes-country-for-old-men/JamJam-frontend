import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import theme from '@styles/theme';
import SearchIcon from '@assets/icons/search.svg?react';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

const ANIMATION_VARIANTS = {
  searchContainer: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    focus: {
      scale: 1.05,
      boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.03)',
    },
    tap: { scale: 0.95 },
  },
  searchButton: {
    rest: {
      scale: 1,
      backgroundColor: 'transparent',
      y: '-50%',
    },
    hover: {
      scale: 1.1,
      backgroundColor: theme.COLORS.JAMJAM_PRIMARY[2],
      y: '-50%',
    },
    tap: {
      scale: 0.9,
      y: '-50%',
    },
  },
} as const;

const SearchContainer = styled(motion.div)`
  width: 100%;
  position: relative;
  border-radius: 12px;
`;

const SearchInput = styled(motion.input)`
  width: 100%;
  background-color: white;
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 18px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  padding: 24px 64px 24px 20px;

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  }
`;

const SearchButton = styled(motion.button)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 12px;
  top: 50%;
  width: 40px;
  height: 40px;
  border-radius: 12px;
`;

const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onChange,
  onSearch,
  placeholder = '필요한 손길을 찾아보세요',
  className,
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleSearch = () => {
    onSearch?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer
      className={className}
      variants={ANIMATION_VARIANTS.searchContainer}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={isSearchFocused ? 'focus' : 'rest'}
    >
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        layout
      />
      <SearchButton
        variants={ANIMATION_VARIANTS.searchButton}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={handleSearch}
      >
        <motion.div
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <SearchIcon fill={theme.COLORS.JAMJAM_PRIMARY[1]} />
        </motion.div>
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
