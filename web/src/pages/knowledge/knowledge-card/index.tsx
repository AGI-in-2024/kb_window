import OperateDropdown from '@/components/operate-dropdown';
import { KnowledgeRouteKey } from '@/constants/knowledge';
import { useDeleteKnowledge } from '@/hooks/knowledge-hooks';
import { useFetchUserInfo } from '@/hooks/user-setting-hooks';
import { IKnowledge } from '@/interfaces/database/knowledge';
import { formatDate } from '@/utils/date';
import {
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Card, Space, Tooltip } from 'antd';
import classNames from 'classnames';
import { useNavigate } from 'umi';
import styles from './index.less';

interface IProps {
  item: IKnowledge;
}

const KnowledgeCard = ({ item }: IProps) => {
  const navigate = useNavigate();
  const { data: userInfo } = useFetchUserInfo();
  const { deleteKnowledge } = useDeleteKnowledge();

  const removeKnowledge = async () => {
    return deleteKnowledge(item.id);
  };

  const handleCardClick = () => {
    navigate(`/knowledge/${KnowledgeRouteKey.Dataset}?id=${item.id}`, {
      state: { from: 'list' },
    });
  };

  return (
    <Badge.Ribbon
      text={item.nickname}
      color={userInfo.nickname === item.nickname ? '#00A0E3' : '#E37200'}
      className={classNames(styles.ribbon, {
        [styles.hideRibbon]: item.permission !== 'team',
      })}
    >
      <Card className={styles.card} onClick={handleCardClick} bordered={false}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.userInfo}>
              <Avatar
                size={40}
                icon={<UserOutlined />}
                src={item.avatar}
                className={styles.avatar}
              />
              <span className={styles.nickname}>{item.nickname}</span>
            </div>
            <OperateDropdown deleteItem={removeKnowledge} />
          </div>
          <div className={styles.titleWrapper}>
            <Tooltip title={item.name}>
              <span className={styles.title}>{item.name}</span>
            </Tooltip>
            <p className={styles.description}>{item.description}</p>
          </div>
          <div className={styles.footer}>
            <div className={styles.footerTop}>
              <div className={styles.bottomLeft}>
                <FileTextOutlined className={styles.leftIcon} />
                <span className={styles.rightText}>
                  <Space>{item.doc_num} документов</Space>
                </span>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.bottomLeft}>
                <CalendarOutlined className={styles.leftIcon} />
                <span className={styles.rightText}>
                  {formatDate(item.update_time)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default KnowledgeCard;
