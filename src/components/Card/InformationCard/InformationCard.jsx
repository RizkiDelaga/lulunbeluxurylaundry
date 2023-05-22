import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';

function InformationCard(props) {
  const navigate = useNavigate();

  const [dataTable, setDataTable] = useState();

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '10px',
          backgroundColor: props.inheritColor ? 'inherit' : '#ffffff',
          borderRadius: '4px',
          color: '#000000',
        }}
      >
        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>{props.title}</Typography>
        <span>
          <div className="centerXY" style={{ alignItems: 'end' }}>
            <Typography sx={{ fontSize: '32px', color: '#1F305C', fontWeight: 'bold' }}>
              {props.content.normalText}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#1F305C', fontWeight: 'bold', mb: 1 }}>
              {props.content.smallText}
            </Typography>
          </div>
          <div className="centerXY">{props.content.embedHTML}</div>
        </span>

        <span style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
          <Typography
            onClick={() => navigate(props.navigate.url)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {props.navigate ? props.navigate.text : null}
          </Typography>
        </span>
      </Paper>
    </>
  );
}

export default InformationCard;
