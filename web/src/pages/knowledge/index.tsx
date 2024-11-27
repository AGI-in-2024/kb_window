import { useNextFetchKnowledgeList } from '@/hooks/knowledge-hooks';
import { useFetchUserInfo } from '@/hooks/user-setting-hooks';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Empty, Flex, Input, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSaveKnowledge, useSearchKnowledge } from './hooks';
import styles from './index.less';
import KnowledgeCard from './knowledge-card';
import KnowledgeCreatingModal from './knowledge-creating-modal';

const KnowledgeList = () => {
  const { searchString, handleInputChange } = useSearchKnowledge();
  const { loading, list: data } = useNextFetchKnowledgeList();
  const list = data.filter((x) => x.name.includes(searchString));
  const { data: userInfo } = useFetchUserInfo();
  const { t } = useTranslation('translation', { keyPrefix: 'knowledgeList' });
  const {
    visible,
    hideModal,
    showModal,
    onCreateOk,
    loading: creatingLoading,
  } = useSaveKnowledge();

  return (
    <Flex className={styles.knowledge} vertical flex={1}>
      <div className={styles.topWrapper}>
        <div>
          <h1 className={styles.mainTitle}>Технологии больших идей</h1>
          <span className={styles.title}>
            Добро пожаловать, {userInfo.nickname}
          </span>
          <p className={styles.description}>База знаний и технологий T1</p>
        </div>
        <Space size={'large'}>
          <Input
            placeholder="Поиск по базе знаний"
            value={searchString}
            style={{ width: 280 }}
            allowClear
            onChange={handleInputChange}
            prefix={<SearchOutlined />}
            className={styles.searchInput}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            className={styles.createButton}
          >
            Создать базу знаний
          </Button>
        </Space>
      </div>
      <Spin spinning={loading}>
        <Flex
          gap={'large'}
          wrap="wrap"
          className={styles.knowledgeCardContainer}
        >
          {list.length > 0 ? (
            list.map((item: any) => {
              return (
                <KnowledgeCard item={item} key={item.name}></KnowledgeCard>
              );
            })
          ) : (
            <Empty
              className={styles.knowledgeEmpty}
              description="Базы знаний не найдены"
            ></Empty>
          )}
        </Flex>
      </Spin>
      <KnowledgeCreatingModal
        loading={creatingLoading}
        visible={visible}
        hideModal={hideModal}
        onOk={onCreateOk}
      ></KnowledgeCreatingModal>
    </Flex>
  );
};

export default KnowledgeList;
