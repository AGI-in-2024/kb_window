import { IModalManagerChildrenProps } from '@/components/modal-manager';
import { Form, Input, Modal } from 'antd';
import styles from './index.less';

type FieldType = {
  name?: string;
};

interface IProps extends Omit<IModalManagerChildrenProps, 'showModal'> {
  loading: boolean;
  onOk: (name: string) => void;
}

const KnowledgeCreatingModal = ({
  visible,
  hideModal,
  loading,
  onOk,
}: IProps) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const ret = await form.validateFields();
    onOk(ret.name);
  };

  return (
    <Modal
      title="Создание базы знаний"
      open={visible}
      onOk={handleOk}
      onCancel={hideModal}
      okButtonProps={{ loading }}
      className={styles.modal}
      okText="Создать"
      cancelText="Отмена"
    >
      <Form
        name="Create"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        form={form}
        className={styles.form}
      >
        <Form.Item<FieldType>
          label="Название"
          name="name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите название базы знаний',
            },
          ]}
        >
          <Input placeholder="Введите название базы знаний" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default KnowledgeCreatingModal;
