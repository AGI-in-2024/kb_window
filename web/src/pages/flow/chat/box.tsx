import MessageItem from '@/components/message-item';
import { MessageType } from '@/constants/chat';
import { useTranslate } from '@/hooks/common-hooks';
import { useGetFileIcon } from '@/pages/chat/hooks';
import { buildMessageItemReference } from '@/pages/chat/utils';
import {
  CopyOutlined,
  DesktopOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  Button,
  ColorPicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Spin,
  Switch,
  Tabs,
} from 'antd';
import React, { useState } from 'react';

import { useSendNextMessage } from './hooks';

import PdfDrawer from '@/components/pdf-drawer';
import { useClickDrawer } from '@/components/pdf-drawer/hooks';
import { useFetchUserInfo } from '@/hooks/user-setting-hooks';
import styles from './index.less';

// Type definitions for deployment configuration
interface DeploymentConfig {
  theme: 'light' | 'dark' | 'system';
  primaryColor?: string;
  layout: 'compact' | 'full-width' | 'sidebar';
  position: 'bottom-right' | 'bottom-left' | 'full-screen';
  welcomeMessage?: string;
  platform: 'website' | 'telegram' | 'slack' | 'custom-api';
  language: string;
  branding: boolean;
}

// Props interface for DeploymentConfigModal
interface DeploymentConfigModalProps {
  visible: boolean;
  onCancel: () => void;
  onGenerate: (config: DeploymentConfig) => void;
}

const DeploymentConfigModal: React.FC<DeploymentConfigModalProps> = ({
  visible,
  onCancel,
  onGenerate,
}) => {
  const [form] = Form.useForm<DeploymentConfig>();

  const handleGenerate = () => {
    form.validateFields().then((values) => {
      onGenerate(values);
      onCancel();
    });
  };

  return (
    <Modal
      title="Deployment Configuration"
      open={visible}
      onCancel={onCancel}
      onOk={handleGenerate}
      width={800}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="UI Customization" key="1">
          <Form<DeploymentConfig> form={form} layout="vertical">
            <Form.Item name="theme" label="Theme">
              <Radio.Group>
                <Radio value="light">Light</Radio>
                <Radio value="dark">Dark</Radio>
                <Radio value="system">System Default</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="primaryColor" label="Primary Color">
              <ColorPicker showText />
            </Form.Item>

            <Form.Item name="layout" label="Layout">
              <Select>
                <Select.Option value="compact">Compact</Select.Option>
                <Select.Option value="full-width">Full Width</Select.Option>
                <Select.Option value="sidebar">Sidebar</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="position" label="Widget Position">
              <Radio.Group>
                <Radio value="bottom-right">
                  <MobileOutlined /> Bottom Right
                </Radio>
                <Radio value="bottom-left">
                  <MobileOutlined /> Bottom Left
                </Radio>
                <Radio value="full-screen">
                  <DesktopOutlined /> Full Screen
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="welcomeMessage" label="Welcome Message">
              <Input placeholder="Enter initial welcome message" />
            </Form.Item>
          </Form>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Integration" key="2">
          <Form<DeploymentConfig> form={form} layout="vertical">
            <Form.Item name="platform" label="Deployment Platform">
              <Select>
                <Select.Option value="website">Website</Select.Option>
                <Select.Option value="telegram">Telegram</Select.Option>
                <Select.Option value="slack">Slack</Select.Option>
                <Select.Option value="custom-api">Custom API</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="language" label="Default Language">
              <Select>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="es">Spanish</Select.Option>
                <Select.Option value="fr">French</Select.Option>
                <Select.Option value="de">German</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="branding" label="Show Branding">
              <Switch defaultChecked />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

const FlowChatBox = () => {
  const {
    sendLoading,
    handleInputChange,
    handlePressEnter,
    value,
    loading,
    ref,
    derivedMessages,
    reference,
  } = useSendNextMessage();

  const { visible, hideModal, documentId, selectedChunk, clickDocumentButton } =
    useClickDrawer();
  useGetFileIcon();
  const { t } = useTranslate('chat');
  const { data: userInfo } = useFetchUserInfo();

  const [deployModalVisible, setDeployModalVisible] = useState(false);
  const [deployConfig, setDeployConfig] = useState<DeploymentConfig | null>(
    null,
  );

  const handleDeploy = () => {
    setDeployModalVisible(true);
  };

  const generateEmbedCode = (config: DeploymentConfig) => {
    setDeployConfig(config);

    const embedCode = `
<script>
  window.ragflowChat = {
    flowId: '${Math.random().toString(36).substr(2, 9)}',
    config: ${JSON.stringify(config, null, 2)}
  };
  (function() {
    const script = document.createElement('script');
    script.src = 'https://your-ragflow-cdn.com/embed.js';
    document.body.appendChild(script);
  })();
</script>
    `.trim();

    navigator.clipboard
      .writeText(embedCode)
      .then(() => {
        message.success('Customized embed code copied to clipboard!');
      })
      .catch((err) => {
        message.error('Failed to copy embed code');
      });
  };

  return (
    <>
      <Flex flex={1} className={styles.chatContainer} vertical>
        <Flex flex={1} vertical className={styles.messageContainer}>
          <div>
            <Spin spinning={loading}>
              {derivedMessages?.map((message, i) => {
                return (
                  <MessageItem
                    loading={
                      message.role === MessageType.Assistant &&
                      sendLoading &&
                      derivedMessages.length - 1 === i
                    }
                    key={message.id}
                    nickname={userInfo.nickname}
                    avatar={userInfo.avatar}
                    item={message}
                    reference={buildMessageItemReference(
                      { message: derivedMessages, reference },
                      message,
                    )}
                    clickDocumentButton={clickDocumentButton}
                    index={i}
                    showLikeButton={false}
                    sendLoading={sendLoading}
                  ></MessageItem>
                );
              })}
            </Spin>
          </div>
          <div ref={ref} />
        </Flex>
        <Input
          size="large"
          placeholder={t('sendPlaceholder')}
          value={value}
          suffix={
            <Flex gap="small">
              <Button
                type="primary"
                onClick={handlePressEnter}
                loading={sendLoading}
              >
                {t('send')}
              </Button>
              <Button
                icon={<CopyOutlined />}
                onClick={handleDeploy}
                title="Deploy / Get Embed Code"
              >
                Deploy
              </Button>
            </Flex>
          }
          onPressEnter={handlePressEnter}
          onChange={handleInputChange}
        />
      </Flex>
      <PdfDrawer
        visible={visible}
        hideModal={hideModal}
        documentId={documentId}
        chunk={selectedChunk}
      ></PdfDrawer>

      <DeploymentConfigModal
        visible={deployModalVisible}
        onCancel={() => setDeployModalVisible(false)}
        onGenerate={generateEmbedCode}
      />
    </>
  );
};

export default FlowChatBox;
