import { useAppTranslation } from "./i18n";

const TranslateText = () => {
  const { t } = useAppTranslation('demo');

return (<>
    <div>{t('Hello world')}</div>
    <div>{t('{count} items', { count: 123 })}</div>
  </>
  );
};

export default TranslateText;