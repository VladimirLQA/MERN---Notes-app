import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Form, Input, Button, Switch, Select, Space, message, Spin, Popconfirm, Tag } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
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

interface Note {
    _id: string;
    title: string;
    content: string;
    labels: string[];
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
}

const NoteDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { theme } = useTheme();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState<Note | null>(null);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        fetchNote();
    }, [id]);

    const fetchNote = async () => {
        try {
            const response = await fetch(`/api/notes/${id}`);
            if (response.ok) {
                const data = await response.json();
                setNote(data.note);
                setLabels(data.note.labels || []);
                form.setFieldsValue({
                    title: data.note.title,
                    content: data.note.content,
                    isPinned: data.note.isPinned,
                });
            } else {
                message.error('Failed to fetch note');
                navigate('/notes');
            }
        } catch (error) {
            message.error('Error fetching note');
            console.error('Error:', error);
        } finally {
            setFetchLoading(false);
        }
    };

    const handleUpdate = async (values: any) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    labels,
                }),
            });

            if (response.ok) {
                message.success('Note updated successfully!');
                setIsEditing(false);
                fetchNote(); // Refresh the note data
            } else {
                message.error('Failed to update note');
            }
        } catch (error) {
            message.error('Error updating note');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Note deleted successfully!');
                navigate('/notes');
            } else {
                message.error('Failed to delete note');
            }
        } catch (error) {
            message.error('Error deleting note');
            console.error('Error:', error);
        }
    };

    if (fetchLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!note) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2 style={{ color: theme.colors.textPrimary }}>Note not found</h2>
                <Button 
                    onClick={() => navigate('/notes')}
                    style={{
                        backgroundColor: theme.colors.buttonPrimary,
                        borderColor: theme.colors.buttonPrimary,
                        color: '#fff'
                    }}
                >
                    Back to Notes
                </Button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                    icon={<ArrowLeftOutlined />} 
                    onClick={() => navigate('/notes')}
                    type="text"
                    style={{ color: theme.colors.textPrimary }}
                >
                    Back to Notes
                </Button>
                
                <Space>
                    {!isEditing && (
                        <Button 
                            icon={<EditOutlined />} 
                            onClick={() => setIsEditing(true)}
                            type="primary"
                            style={{
                                backgroundColor: theme.colors.buttonPrimary,
                                borderColor: theme.colors.buttonPrimary,
                            }}
                        >
                            Edit
                        </Button>
                    )}
                    <Popconfirm
                        title="Delete Note"
                        description="Are you sure you want to delete this note?"
                        onConfirm={handleDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button 
                            icon={<DeleteOutlined />} 
                            danger
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            </div>

            <Card 
                title={
                    <span style={{ color: theme.colors.textPrimary }}>
                        {isEditing ? "Edit Note" : "Note Details"}
                    </span>
                }
                extra={
                    <div style={{ color: theme.colors.textSecondary }}>
                        <div>Created: {new Date(note.createdAt).toLocaleDateString()}</div>
                        <div>Updated: {new Date(note.updatedAt).toLocaleDateString()}</div>
                    </div>
                }
                style={{
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                    boxShadow: theme.colors.shadow,
                }}
            >
                {isEditing ? (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpdate}
                    >
                        <Form.Item
                            name="title"
                            label={<span style={{ color: theme.colors.textPrimary }}>Title</span>}
                            rules={[{ required: true, message: 'Please enter a title' }]}
                        >
                            <Input 
                                placeholder="Enter note title" 
                                size="large"
                                style={{
                                    backgroundColor: theme.colors.inputBackground,
                                    borderColor: theme.colors.border,
                                    color: theme.colors.textPrimary,
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label={<span style={{ color: theme.colors.textPrimary }}>Content</span>}
                            rules={[{ required: true, message: 'Please enter content' }]}
                        >
                            <TextArea 
                                placeholder="Enter note content"
                                rows={8}
                                size="large"
                                style={{
                                    backgroundColor: theme.colors.inputBackground,
                                    borderColor: theme.colors.border,
                                    color: theme.colors.textPrimary,
                                }}
                            />
                        </Form.Item>

                        <Form.Item label={<span style={{ color: theme.colors.textPrimary }}>Labels</span>}>
                            <Select
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
                                    Save Changes
                                </Button>
                                <Button 
                                    onClick={() => {
                                        setIsEditing(false);
                                        fetchNote(); // Reset form
                                    }}
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
                ) : (
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <h2 style={{ marginBottom: '8px', color: theme.colors.textPrimary }}>
                                {note.title}
                                {note.isPinned && <Tag color="gold" style={{ marginLeft: '8px' }}>📌 Pinned</Tag>}
                            </h2>
                        </div>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ color: theme.colors.textPrimary }}>Content:</h4>
                            <div style={{ 
                                background: theme.colors.inputBackground, 
                                padding: '12px', 
                                borderRadius: '6px',
                                minHeight: '200px',
                                whiteSpace: 'pre-wrap',
                                color: theme.colors.textPrimary,
                                border: `1px solid ${theme.colors.border}`
                            }}>
                                {note.content}
                            </div>
                        </div>

                        {note.labels && note.labels.length > 0 && (
                            <div style={{ marginBottom: '10px' }}>
                                <h4 style={{ color: theme.colors.textPrimary }}>Labels:</h4>
                                <div>
                                    {note.labels.map(label => (
                                        <Tag 
                                            key={label} 
                                            style={{
                                                backgroundColor: theme.colors.tagBackground,
                                                color: theme.colors.textPrimary,
                                                border: `1px solid ${theme.colors.border}`
                                            }}
                                        >
                                            {label}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default NoteDetails;