import React, {Component} from "react";
import { Layout } from 'antd';
import "./layout.scss";
import Aside from "./components/aside";
import LayoutHeader from "./components/header";
import ContainerMain from "../../components/containerMain/index";
const {Sider,Header,Content} = Layout;

class Index extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    return(
      <Layout className="layout-wrap">
        <Header className="layout-header"><LayoutHeader /></Header>
        <Layout>
          <Sider width="250px"><Aside /></Sider>
          <Content className="layout-main">
            <ContainerMain />
          </Content>
        </Layout>
      </Layout>
    )
  }
}


export default Index;