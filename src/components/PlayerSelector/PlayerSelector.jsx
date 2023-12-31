import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const CenteredContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function PlayerSelector() {

    const players = useSelector((store) => store.playerReducer);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const dispatch = useDispatch();

            useEffect(() => {
                    dispatch({ type: "FETCH_PLAYERS" });
                  }, [dispatch]);
                  


                  function handleSubmit(){
                   

                    dispatch({
                        type: "ADD_READY_PLAYER",
                        payload: selectedPlayers
                      });
                      //console.log("selected player objects", selectedPlayers )
                  }

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    onChange: (event, newValue) => {
        setSelectedPlayers(newValue);
      },
    id: 'customized-hook-demo',
    defaultValue: [],
    multiple: true,
    options: players,
    getOptionLabel: (option) => option.player_name,
  });

  return (
    <CenteredContainer>
    <Root>
      <div {...getRootProps()}>
        <Label style={{ display: 'flex', justifyContent: 'center', fontSize: 17 }} {...getInputLabelProps()}>Player List</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag label={option.player_name} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.player_name}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
       <div style={{ display: 'flex', justifyContent: 'center', padding: '5px', }}> <Button style={{ background: 'rgb(14, 49, 125)'}} variant="contained" onClick={handleSubmit}>Submit</Button> </div>
    </Root>
    </CenteredContainer>
  
  );

  
}






















// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";

// export default function PlayerSelector() {
//     const players = useSelector((store) => store.playerReducer);
//     const dispatch = useDispatch();
//     const [selectedPlayer, setSelectedPlayer] = useState("");
//     const [selectedPlayerObject, setSelectedPlayerObject] = useState(null);

//     useEffect(() => {
//             dispatch({ type: "FETCH_PLAYERS" });
//           }, [dispatch]);

//           function handleClick() {
            
//             const selectedPlayerObject = players.find(
//               (player) => player.player_name === selectedPlayer
//             );
//             setSelectedPlayerObject(selectedPlayerObject);
//             console.log(selectedPlayerObject)
//           }

//   return (
//     <div>
//     <Stack spacing={2} sx={{ width: 300 }}>
//       <Autocomplete
//         id="free-solo-demo"
//         freeSolo
//         options={players.map((option) => option.player_name)}
//         value={selectedPlayer}
//   onChange={(event, newValue) => {
//     setSelectedPlayer(newValue);
//   }}
//         renderInput={(params) => <TextField {...params} label="Select Player" />}
//       />
//     </Stack>

//     <button onClick={handleClick}>Please</button>
//     </div>
//   );
// }
