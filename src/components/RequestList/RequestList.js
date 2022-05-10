import React, { useState, useEffect,useRef } from 'react';
import 'antd/dist/antd.css';
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllRequestList,getDoneRequestList } from '../../api';
const InfiniteListExample = (select) => {
  //console.log("begin",select.select)
 
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  //return different list based on select

  const loadMoreData = () => {
    if (loading) {
      console.log("loading..");
      //return;
    }
    setLoading(true);
    
    if(select.select === 1){
      //getAllRequestList()
      console.log("here")
      getAllRequestList().then(res=> {
                   console.log("res",res)
                   setData(res)
                   setLoading(false) 
                   console.log("data",data)
              })
             .catch(()=>{
               setLoading(false)
             })
    }else{
      const doneList = getDoneRequestList()
      doneList.then(res=> console.log(res))
              .then(()=>{
                setLoading(false)
              })
             .catch(()=>{
               setLoading(false)
             })
      }
    
  };

  useEffect(() => {
    loadMoreData();
    console.log("select","111")
  }, [select]);


  return (
    <div
      id="scrollableDiv"
      style={{
        height: 800,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.RestaurantName}</a>}
                description={item.RestaurantEmail}
              />
              <div>{item.status}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteListExample ;