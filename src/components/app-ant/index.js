import {Col, Layout, Row, Slider } from "antd";
import {Table} from '../table';
import s from './styles.module.css'
import Typography from 'antd/es/typography/Typography';
import { useState } from 'react';


const { Header, Content, Footer } = Layout;

export const AntApp = () => {

    const[rows, setRows] = useState(5);
   
    
    return (
        <Layout>
            <Header className={s.header}>Header</Header>
            <Content>
                <Row>
                    <Col xs={24} md={{span:16, offset:4}}>
                    <Slider min = {1} max = {100} defaultValue = {rows} onChange = {setRows}/>
                    <Table rows={rows}/>
                    {/* <p style={{fontSize:'12px',color:'red'}}>инлайн</p> */}
                    </Col>
                </Row>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}