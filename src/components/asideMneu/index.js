import React, {Component,Fragment} from "react";
import {Link} from "react-router-dom";
import { Menu } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import Router from "../../router/index";
const { SubMenu } = Menu;

class AsideMenu extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  renderMenu=({title,key})=>{
  return (
    <Menu.Item key={key}>
      <Link to={key}>{title}</Link>
      </Menu.Item>
  )
  }

  renderSubmenu=({key,title,child})=>{
    return (<SubMenu key={key} icon={<UserOutlined />} title={title}>
      {
        child && child.map(item =>{
          return item.child && item.child.length >0 ?  this.renderSubmenu(item) : this.renderMenu(item);
        })
      }
    </SubMenu>)
  }

  render(){
    return(
      <Fragment>
        <Menu 
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            Router && Router.map(firstItem=>{
              return firstItem.child && firstItem.child.length > 0 ? this.renderSubmenu(firstItem) : this.renderMenu(firstItem);
            })
          }
        </Menu>
      </Fragment>
    )
  }
}


export default AsideMenu;