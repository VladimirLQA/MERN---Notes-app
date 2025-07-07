import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Space, message, Spin, Empty, Tag, Popconfirm, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined, FileTextOutlined, PlusOutlined, PushpinOutlined } from "@ant-design/icons";
import { useTheme } from '../../contexts/ThemeContext';

interface Note {
  _id: string;
  title: string;
  content: string;
  labels: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

const NoteList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes || []);
      } else {
        message.error('Failed to fetch notes');
      }
    } catch (error) {
      message.error('Error fetching notes');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    setDeleteLoading(noteId);
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.success('Note deleted successfully!');
        setNotes(notes.filter(note => note._id !== noteId));
      } else {
        message.error('Failed to delete note');
      }
    } catch (error) {
      message.error('Error deleting note');
      console.error('Error:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  const pinnedNotes = notes.filter(note => note.isPinned);
  const regularNotes = notes.filter(note => !note.isPinned);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', color: '#1890ff' }}>
          <FileTextOutlined style={{ marginRight: '8px' }} />
          My Notes
        </h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          size="large"
          onClick={() => navigate("/notes/create")}
          style={{
            backgroundColor: theme.colors.buttonPrimary,
            borderColor: theme.colors.buttonPrimary,
          }}
        >
          New Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <Empty
          description={<span style={{ color: theme.colors.textSecondary }}>No notes yet</span>}
          style={{ margin: '50px 0' }}
        >
          <Button 
            type="primary" 
            onClick={() => navigate("/notes/create")}
            style={{
              backgroundColor: theme.colors.buttonPrimary,
              borderColor: theme.colors.buttonPrimary,
            }}
          >
            Create your first note
          </Button>
        </Empty>
      ) : (
        <div>
              <Row gutter={[16, 16]}>
                {pinnedNotes.map((note) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={note._id}>
                    <Card
                      hoverable
                      style={{ 
                        height: '280px', 
                        width: '500px',
                        display: 'flex', 
                        flexDirection: 'column',
                        backgroundColor: theme.colors.cardBackground,
                        borderColor: theme.colors.border,
                        boxShadow: theme.colors.shadow,
                        transition: 'all 0.3s ease'
                      }}
                      styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                          <span style={{ fontSize: '12px' }}>
                            <PushpinOutlined style={{ color: '#faad14', fontSize: '15px', margin: '0 10px 0 0' }} />
                          </span>
                          <span style={{ 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap',
                            maxWidth: '150px',
                            color: theme.colors.textPrimary,
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                            {note.title}
                          </span>
                        </div>
                      }
                      extra={
                        <Space>
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => navigate(`/notes/details/${note._id}`)}
                            size="small"
                            style={{ color: theme.colors.textPrimary }}
                          />
                          <Popconfirm
                            title="Delete Note"
                            description="Are you sure you want to delete this note?"
                            onConfirm={() => handleDelete(note._id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              loading={deleteLoading === note._id}
                              danger
                              size="small"
                            />
                          </Popconfirm>
                        </Space>
                      }
                    >
                      <div style={{ flex: 1, marginBottom: '12px' }}>
                        <p style={{ 
                          color: theme.colors.textSecondary,
                          fontSize: '14px',
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {truncateContent(note.content)}
                        </p>
                      </div>
                      
                      <div style={{ marginBottom: '8px' }}>
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
                       
                       <div style={{ 
                         fontSize: '12px', 
                         color: theme.colors.textSecondary,
                         textAlign: 'right'
                       }}>
                         {new Date(note.updatedAt).toLocaleDateString()}
                       </div>
                     </Card>
                   </Col>
                 ))}
               </Row>

              <Row gutter={[16, 16]}>
                {regularNotes.map((note) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={note._id}>
                    <Card
                      hoverable
                      style={{ 
                        height: '280px', 
                        width: '500px',
                        display: 'flex', 
                        flexDirection: 'column',
                        backgroundColor: theme.colors.cardBackground,
                        borderColor: theme.colors.border,
                        boxShadow: theme.colors.shadow,
                        transition: 'all 0.3s ease'
                      }}
                      styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
                      title={
                        <span style={{ 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap',
                          color: theme.colors.textPrimary
                        }}>
                          {note.title}
                        </span>
                      }
                      extra={
                        <Space>
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => navigate(`/notes/details/${note._id}`)}
                            size="small"
                            style={{ color: theme.colors.textPrimary }}
                          />
                          <Popconfirm
                            title="Delete Note"
                            description="Are you sure you want to delete this note?"
                            onConfirm={() => handleDelete(note._id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              loading={deleteLoading === note._id}
                              danger
                              size="small"
                            />
                          </Popconfirm>
                        </Space>
                      }
                    >
                      <div style={{ flex: 1, marginBottom: '12px' }}>
                        <p style={{ 
                          color: theme.colors.textSecondary,
                          fontSize: '14px',
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {truncateContent(note.content)}
                        </p>
                      </div>
                      
                      <div style={{ marginBottom: '8px' }}>
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
                       
                       <div style={{ 
                         fontSize: '12px', 
                         color: theme.colors.textSecondary,
                         textAlign: 'right'
                       }}>
                         {new Date(note.updatedAt).toLocaleDateString()}
                       </div>
                     </Card>
                   </Col>
                 ))}
               </Row>
             </div>
           )}
         </div>
       );
};

export default NoteList;