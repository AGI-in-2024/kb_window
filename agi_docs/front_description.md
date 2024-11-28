# RAGFlow User Interface Description

## Admin Panel

### Chat Assistants Management
- **Create Chat Assistant**
  - Input Fields:
    - Name (required)
    - Avatar (optional, base64 encoded)
    - Dataset IDs (optional)
  - LLM Configuration:
    - Model Selection
    - Temperature Control (0.1 default)
    - Top-P Sampling
    - Presence/Frequency Penalties
    - Max Token Limit

- **Chat Assistant List View**
  - Columns:
    - Name
    - Creation Date
    - Associated Datasets
    - Language
    - Status
  - Actions:
    - Edit
    - Delete
    - View Details

### Dataset Integration
- Ability to associate datasets with chat assistants
- Dataset selection dropdown
- Preview of dataset contents

### Prompt Configuration
- Custom prompt template editing
- Advanced retrieval settings:
  - Similarity Threshold
  - Keywords Similarity Weight
  - Top-N Chunk Retrieval
  - Empty Response Handling

## Chat Panel

### Session Management
- **Create New Session**
  - Name input
  - Automatic session ID generation
  - Initial assistant greeting

- **Session List**
  - Scrollable list of previous sessions
  - Session name
  - Creation date
  - Quick delete option

### Conversation Interface
- **Chat Input**
  - Text input field
  - Send button
  - Streaming response support

- **Message Display**
  - User and Assistant messages
  - Reference/Source attribution
  - Chunk references with similarity scores
  - Document source indicators

### Advanced Conversation Features
- Streaming response rendering
- Reference chunk highlighting
- Session context preservation
- Multiple dataset knowledge integration

## Configuration Modals

### LLM Configuration Modal
- Model Selection Dropdown
- Slider Controls:
  - Temperature (Creativity)
  - Top-P (Sampling Threshold)
  - Presence Penalty
  - Frequency Penalty
- Max Token Limit Input

### Retrieval Configuration Modal
- Similarity Threshold Slider
- Keywords Similarity Weight
- Top-N Chunk Retrieval
- Reranking Model Selection
- Empty Response Template

## User Experience Considerations
- Responsive design
- Dark/Light mode support
- Intuitive configuration interfaces
- Clear error messaging
- Performance indicators for retrieval and generation
