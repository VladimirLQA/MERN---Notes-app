import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Switch, Select, Space, message } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const { TextArea } = Input;
const { Option } = Select;

// Default label options
const DEFAULT_LABELS = [
    { value: 'work', label: 'Work' },
    { value: 'study', label: 'Study' },
    { value: 'important', label: 'Important' },
    { value: 'personal', label: 'Personal' },
    { value: 'todo', label: 'Todo' },
    { value: 'ideas', label: 'Ideas' },
];

const CreatePage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [labels, setLabels] = useState<string[]>([]);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});

    const handleSubmit = async (values: { title: string; content: string; isPinned: boolean }) => {
        setLoading(true);
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    labels,
                }),
            });

            if (response.ok) {
                message.success('Note created successfully!');
                navigate('/notes');
            } else {
                message.error('Failed to create note');
            }
        } catch (error) {
            message.error('Error creating note');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onFieldsChange = (allFields: { name: string[]; errors?: string[] }[]) => {
        const errors: { [key: string]: boolean } = {};
        allFields.forEach(field => {
            if (field.errors && field.errors.length > 0) {
                errors[field.name[0]] = true;
            }
        });
        setFieldErrors(errors);
    };

    const getInputStyle = (fieldName: string) => ({
        backgroundColor: theme.colors.inputBackground,
        borderColor: fieldErrors[fieldName] ? '#ff4d4f' : theme.colors.border,
        color: theme.colors.textPrimary,
        border: '1px solid',
        boxShadow: fieldErrors[fieldName] ? '0 0 0 2px rgba(255, 77, 79, 0.2)' : 'none',
    });

    return (
        <div className="create-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <Button 
                    icon={<ArrowLeftOutlined />} 
                    onClick={() => navigate('/notes')}
                    type="text"
                    style={{
                        color: theme.colors.textPrimary,
                    }}
                >
                    Back to Notes
                </Button>
            </div>

            <Card 
                title={<span style={{ color: theme.colors.textPrimary }}>Create New Note</span>}
                style={{
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                    boxShadow: theme.colors.shadow,
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    onFieldsChange={onFieldsChange}
                >
                    <Form.Item
                        name="title"
                        label={<span style={{ color: theme.colors.textPrimary }}>Title</span>}
                        rules={[
                            { required: true, message: 'Please enter a title' },
                            { min: 3, message: 'Title must be at least 3 characters long' },
                            { max: 100, message: 'Title cannot exceed 100 characters long' }
                        ]}
                    >
                        <Input 
                            placeholder="Enter note title" 
                            size="large"
                            style={getInputStyle('title')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label={<span style={{ color: theme.colors.textPrimary }}>Content</span>}
                        rules={[
                            { required: true, message: 'Please enter content' },
                            { min: 10, message: 'Content must be at least 10 characters long' },
                            { max: 1000, message: 'Content cannot exceed 1000 characters long' }
                        ]}
                    >
                        <TextArea 
                            placeholder="Enter note content"
                            rows={8}
                            size="large"
                            style={getInputStyle('content')}
                        />
                    </Form.Item>

                    <Form.Item label={<span style={{ color: theme.colors.textPrimary }}>Labels</span>}>
                        <Select
                            className={`label-select ${theme.name}-theme`}
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Select or type custom labels"
                            value={labels}
                            onChange={setLabels}
                            tokenSeparators={[',']}
                            size="large"
                        >
                            {DEFAULT_LABELS.map(label => (
                                <Option key={label.value} value={label.value}>
                                    {label.label}
                                </Option>
                            ))}
                        </Select>
                        <div style={{ fontSize: '12px', color: theme.colors.textSecondary, marginTop: '4px' }}>
                            Select from dropdown or type custom labels. Press Enter or comma to add.
                        </div>
                    </Form.Item>

                    <Form.Item
                        name="isPinned"
                        label={<span style={{ color: theme.colors.textPrimary }}>Pin Note</span>}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading}
                                icon={<SaveOutlined />}
                                size="large"
                                style={{
                                    backgroundColor: theme.colors.buttonPrimary,
                                    borderColor: theme.colors.buttonPrimary,
                                }}
                            >
                                Create Note
                            </Button>
                            <Button 
                                onClick={() => navigate('/notes')}
                                size="large"
                                style={{
                                    backgroundColor: theme.colors.buttonSecondary,
                                    borderColor: theme.colors.border,
                                    color: theme.colors.textPrimary,
                                }}
                            >
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreatePage;