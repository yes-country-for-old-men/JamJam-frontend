import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: calc(100dvh - 108px);
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-right: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
`;

export const SearchInputWrapper = styled.section`
  display: flex;
  align-items: center;
  height: 76px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  padding: 0 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 20px;
  font-size: 14px;
  padding: 12px 16px;

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  }

  &:focus {
    border-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  }
`;

export const ChatRoomList = styled.nav`
  flex: 1;
  overflow-y: auto;
`;

export const MainArea = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100dvh - 108px);
  background-color: white;
`;

export const EmptyState = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyStateText = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  text-align: center;
  word-break: keep-all;
  margin-top: 16px;
  padding: 0 12px;
`;
