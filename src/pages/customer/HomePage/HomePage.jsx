import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getExample, editExample } from '../../../redux/actions/exampleAction';

function HomePage() {
  const navigate = useNavigate();
  const [exampleData, setExampleData] = useState({
    id: 0,
    title: '',
    price: 0,
    image: '',
    deskripsi: '',
  });

  const dispatch = useDispatch();
  const { isLoading: loadingGetExample, data: dataGetExample } = useSelector((state) => state.getExample);
  const { isLoading: loadingEditExample, data: dataEditExample } = useSelector((state) => state.editExample);

  React.useEffect(() => {
    document.title = 'Beranda | Lulu n Be Luxury Laundry';
    dispatchGetExample();
    if (!loadingGetExample) {
      saveData();
    }
  }, [loadingGetExample]);

  const dispatchGetExample = async () => {
    return await dispatch(getExample());
  };

  const submitHandler = () => {
    const formData = new FormData();

    // formData.append(...exampleData);
    formData.append('id', exampleData.id);
    formData.append('title', exampleData.title);
    formData.append('price', exampleData.price);
    formData.append('image', exampleData.image);
    formData.append('deskripsi', exampleData.deskripsi);

    dispatch(editExample(exampleData.id, exampleData));
  };

  const saveData = () => {
    setExampleData({
      ...exampleData,
      id: dataGetExample[0].id,
      title: dataGetExample[0].title,
      price: dataGetExample[0].price,
      image: dataGetExample[0].image,
      deskripsi: dataGetExample[0].deskripsi,
    });
  };

  return (
    <>
      {loadingGetExample ? null : (
        <Card variant="outline">
          <h1>{dataGetExample[0].title}</h1>
          <p>{dataGetExample[0].deskripsi}</p>
          <input
            type="text"
            value={exampleData.title}
            onChange={(e) => {
              setExampleData({ ...exampleData, title: e.target.value });
            }}
          />
          <h4>{exampleData.title}</h4>
          <button
            onClick={() => {
              submitHandler();
            }}
          >
            edit
          </button>
        </Card>
      )}

      <button onClick={() => navigate('/dashboard')}>Navbar & Sidebar Admin</button>
      <h1>sadasd</h1>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
        velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
        scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
        lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
        ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim
        diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
        risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices
        sagittis orci a.
      </Typography>
    </>
  );
}

export default HomePage;
