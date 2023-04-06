import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getExample, editExample } from '../../../redux/actions/exampleAction';
import PageStructure from '../../../components/PageStructure/PageStructure';
import AreaChart from '../../../components/Graph/AreaChart';
import LineChart from '../../../components/Graph/LineChart';
import HorizontalBarChart from '../../../components/Graph/HorizontalBarChart';
import VerticalBarChart from '../../../components/Graph/VerticalBarChart';
import StackedBarChart from '../../../components/Graph/StackedBarChart';
import PieChart from '../../../components/Graph/PieChart';
import DoughnutChart from '../../../components/Graph/DoughnutChart';
import PopupDialog from '../../../components/PopupDialog/PopupDialog';
import Input from '../../../components/Input';

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
      <PopupDialog />
      <PageStructure
        defaultMenu="dashboard"
        previousPage={{
          title: 'Title Name',
          link: '/link',
        }}
        currentPage={{
          title: 'Title Name',
          link: '/link',
        }}
      />
      <Input />

      <button onClick={() => navigate('/dashboard')}>Navbar & Sidebar Admin</button>
      <h1>sadasd</h1>
      <div style={{ margin: '40px' }}>
        <div style={{ height: '300px' }}>
          <LineChart />
        </div>
        <br />

        <div style={{ height: '300px' }}>
          <VerticalBarChart />
        </div>
        <br />

        <div style={{ height: '300px' }}>
          <HorizontalBarChart />
        </div>
        <br />

        <div style={{ height: '300px' }}>
          <StackedBarChart />
        </div>
        <br />

        <div style={{ height: '300px' }}>
          <AreaChart
            data={{
              labels: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Today'],
              datasets: [
                {
                  fill: true,
                  label: 'Income',
                  data: [598884, 819838, 674452, 454919, 925132],
                  borderColor: 'rgb(31, 48, 92)',
                  backgroundColor: 'rgb(31, 48, 92, 0.5)',
                },
                {
                  fill: false,
                  label: 'Expenses',
                  data: [218828, 53563, 221413, 54946, 91714],
                  borderColor: 'rgb(211, 47, 47)',
                  backgroundColor: 'rgb(211, 47, 47, 0.5)',
                },
              ],
            }}
          />
        </div>
        <br />

        <div style={{ height: '300px' }}>
          <PieChart />
        </div>
        <br />

        <div style={{ height: '300px' }}>
          <DoughnutChart />
        </div>
      </div>
    </>
  );
}

export default HomePage;
