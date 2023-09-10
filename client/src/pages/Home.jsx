import ForumList from '../components/ForumList';
import '../utils/auth';

const leftPanelStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    width: '200px',
    color: '#000000',
};

export default function Home() {
    return (
        <>
            <div style={leftPanelStyle}>
              <ForumList />
            </div>
        </>
    );
}