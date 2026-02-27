import InfoTooltip from '@/shared/ui/InfoTooltip';

const DocumentsTooltip = () => {
  return (
    <InfoTooltip
      title="💡 증빙 자료 안내"
      items={[
        '증빙 자료는 필수 사항이 아닙니다.',
        '파일당 최대 10MB까지 업로드 가능합니다.',
        '자료 검토 후, 프로필에 인증 마크가 부착됩니다.',
      ]}
    />
  );
};

export default DocumentsTooltip;
