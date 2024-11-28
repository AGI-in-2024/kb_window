import MessageItem from '@/components/message-item';
import { useClickDrawer } from '@/components/pdf-drawer/hooks';
import { MessageType } from '@/constants/chat';
import { useTranslate } from '@/hooks/common-hooks';
import { useFetchUserInfo } from '@/hooks/user-setting-hooks';
import { buildMessageItemReference } from '@/pages/chat/utils';
import { GlobalOutlined, RobotOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Spin,
  Tabs,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { useParams } from 'umi';
import { useSendNextMessage } from './hooks';
import styles from './index.less';

// Type definitions for deployment configuration
interface TelegramConfig {
  token: string;
  api_key: string;
  chat_id: string;
}

interface BotStatus {
  isRunning: boolean;
  lastChecked: Date;
}

// Props interface for TelegramConfigModal
interface TelegramConfigModalProps {
  visible: boolean;
  onCancel: () => void;
  onDeploy: (config: TelegramConfig) => void;
}

const TelegramConfigModal: React.FC<TelegramConfigModalProps> = ({
  visible,
  onCancel,
  onDeploy,
}) => {
  const [form] = Form.useForm<TelegramConfig>();
  const [deploymentStatus, setDeploymentStatus] = useState<string>('');
  const [botStatus, setBotStatus] = useState<BotStatus | null>(null);

  const checkBotStatus = async (chatId: string) => {
    try {
      const response = await fetch(
        `http://45.130.214.61:5005/telebot_check_status/?id=${chatId}`,
      );
      const status = await response.json();
      setBotStatus({
        isRunning: status,
        lastChecked: new Date(),
      });
      return status;
    } catch (error) {
      console.error('Failed to check bot status:', error);
      return false;
    }
  };

  const stopBot = async (chatId: string) => {
    try {
      const response = await fetch(
        `http://45.130.214.61:5005/telebot_stop/?id=${chatId}`,
      );
      if (response.ok) {
        message.success('Bot stopped successfully');
        setBotStatus(null);
      } else {
        message.error('Failed to stop bot');
      }
    } catch (error) {
      message.error('Error stopping bot');
    }
  };

  const handleDeploy = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch('http://45.130.214.61:5005/telebot_start/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: values.token,
          id: values.chat_id,
          data: {
            api_key: values.api_key,
            chat_id: values.chat_id,
            session_id: values.chat_id,
          },
        }),
      });

      if (response.ok) {
        message.success('Telegram bot deployed successfully!');
        const status = await checkBotStatus(values.chat_id);
        if (status) {
          onDeploy(values);
          setDeploymentStatus('Bot is running');
        } else {
          setDeploymentStatus('Bot deployment failed');
        }
      } else {
        message.error('Failed to deploy Telegram bot');
        setDeploymentStatus('Deployment failed');
      }
    } catch (error) {
      message.error('Validation failed or deployment error occurred');
      setDeploymentStatus('Error during deployment');
    }
  };

  return (
    <Modal
      title="Deploy Telegram Bot"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        botStatus?.isRunning ? (
          <Button
            key="stop"
            danger
            onClick={() => {
              const chatId = form.getFieldValue('chat_id');
              if (chatId) {
                stopBot(chatId);
              }
            }}
          >
            Stop Bot
          </Button>
        ) : (
          <Button key="deploy" type="primary" onClick={handleDeploy}>
            Deploy Bot
          </Button>
        ),
        <Button
          key="check"
          onClick={() => {
            const chatId = form.getFieldValue('chat_id');
            if (chatId) {
              checkBotStatus(chatId);
            }
          }}
        >
          Check Status
        </Button>,
      ]}
      width={600}
    >
      <Form<TelegramConfig> form={form} layout="vertical">
        <Form.Item
          name="token"
          label="Telegram Bot Token"
          rules={[{ required: true, message: 'Please enter bot token' }]}
        >
          <Input placeholder="Enter your Telegram bot token" />
        </Form.Item>

        <Form.Item
          name="api_key"
          label="RagFlow API Key"
          rules={[{ required: true, message: 'Please enter API key' }]}
        >
          <Input placeholder="Enter your RagFlow API key" />
        </Form.Item>

        <Form.Item
          name="chat_id"
          label="Chat ID"
          rules={[{ required: true, message: 'Please enter chat ID' }]}
        >
          <Input placeholder="Enter chat ID" />
        </Form.Item>

        {botStatus && (
          <Alert
            message={`Bot Status: ${botStatus.isRunning ? 'Running' : 'Stopped'}`}
            description={`Last checked: ${botStatus.lastChecked.toLocaleString()}`}
            type={botStatus.isRunning ? 'success' : 'warning'}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {deploymentStatus && (
          <Alert
            message={deploymentStatus}
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        )}
      </Form>
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

  const { id: flowId } = useParams<{ id: string }>();
  const { t } = useTranslate('chat');
  const { data: userInfo } = useFetchUserInfo();
  const { clickDocumentButton } = useClickDrawer();

  const [telegramModalVisible, setTelegramModalVisible] = useState(false);
  const [siteDeployModalVisible, setSiteDeployModalVisible] = useState(false);

  const handleTelegramDeploy = (config: TelegramConfig) => {
    message.success('Telegram configuration saved');
  };

  const handleSiteDeploy = () => {
    setSiteDeployModalVisible(true);
  };

  const generateEmbedCode = () => {
    const embedCode = `
<div id="ragflow-chat"></div>
<script>
  window.ragflowConfig = {
    flowId: '${flowId}',
    containerId: 'ragflow-chat',
    theme: 'light',
    position: 'bottom-right'
  };
  (function() {
    const script = document.createElement('script');
    script.src = '${window.location.origin}/embed.js';
    document.body.appendChild(script);
  })();
</script>`.trim();

    return embedCode;
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
                    nickname={userInfo?.nickname}
                    avatar={userInfo?.avatar}
                    item={message}
                    reference={buildMessageItemReference(
                      { message: derivedMessages, reference },
                      message,
                    )}
                    clickDocumentButton={clickDocumentButton}
                    index={i}
                    showLikeButton={false}
                    sendLoading={sendLoading}
                  />
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
                icon={<RobotOutlined />}
                onClick={() => setTelegramModalVisible(true)}
                title="Deploy Telegram Bot"
              >
                Deploy to Telegram
              </Button>
              <Button
                icon={<GlobalOutlined />}
                onClick={handleSiteDeploy}
                title="Deploy to Website"
                type="default"
              >
                Deploy to Site
              </Button>
            </Flex>
          }
          onPressEnter={handlePressEnter}
          onChange={handleInputChange}
        />
      </Flex>

      <TelegramConfigModal
        visible={telegramModalVisible}
        onCancel={() => setTelegramModalVisible(false)}
        onDeploy={handleTelegramDeploy}
      />

      <Modal
        title="Deploy to Website"
        open={siteDeployModalVisible}
        onCancel={() => setSiteDeployModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setSiteDeployModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="preview"
            type="default"
            onClick={() => window.open('http://localhost:3000', '_blank')}
          >
            Open Preview
          </Button>,
          <Button
            key="copy"
            type="primary"
            onClick={() => {
              const embedCode = generateEmbedCode();
              navigator.clipboard.writeText(embedCode);
              message.success('Embed code copied to clipboard!');
            }}
          >
            Copy Embed Code
          </Button>,
        ]}
        width={800}
      >
        <div style={{ marginBottom: 24 }}>
          <Alert
            message="Website Integration"
            description="You can either preview your chat interface directly or embed it into your website using the code below."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Preview" key="1">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <img
                  src="/preview-chat.png"
                  alt="Chat Preview"
                  style={{
                    maxWidth: '100%',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Embed Code" key="2">
              <div
                style={{
                  background: '#f5f5f5',
                  padding: '16px',
                  borderRadius: '4px',
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  {generateEmbedCode()}
                </pre>
              </div>
              <div style={{ marginTop: 16 }}>
                <Typography.Text type="secondary">
                  Add this code to your website where you want the chat
                  interface to appear.
                </Typography.Text>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </>
  );
};

export default FlowChatBox;
