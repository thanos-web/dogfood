import { Button, Container } from '@mui/material';
import { Delete as DeleteIcon, RestoreFromTrash as RestoreFromTrashIcon } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { AppHeader } from '../app-header';
import { PostList } from '../post-list';
import { postData } from '../../postData';


const titleGlobalStyles = <GlobalStyles styles={{ h1: { color: 'grey' } }} />

export const AppMui = () => {
    return (
        <>
        <CssBaseline />
        {/* <Button variant="contained" color='primary' startIcon={<DeleteIcon/>} >Hello World</Button> */}
        <Container>
        <AppHeader/>
        <PostList posts={postData}/>
        </Container>
        
        </>
    )
}

