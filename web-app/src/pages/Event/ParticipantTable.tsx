import React, { useMemo } from 'react';
import zip from 'lodash.zip';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Participant } from '../../types';
import ParticipantItem from './ParticipantItem';
import useStyles from './ParticipantTable.styles';

interface ParticipantTableProps {
  participants?: Participant[];
  teams: string[];
  isParticipant: boolean;
  onJoin: (team: number) => void;
  loading: boolean;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  participants,
  teams,
  isParticipant,
  onJoin,
  loading,
}) => {
  const classes = useStyles();

  const participantRows = useMemo(() => {
    if (!participants) {
      return [];
    }

    const teamsWithParticipants = participants.reduce(
      (acc, participant) => {
        acc[participant.team || 0].push(participant);
        return acc;
      },
      Array.from(Array(teams.length)).map(() => [] as Participant[])
    );

    return zip(...teamsWithParticipants);
  }, [participants, teams]);

  return participants ? (
    <TableContainer className={classes.tableContainer}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {teams.map((team) => (
              <TableCell key={team} className={classes.header}>
                {team}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!isParticipant && (
            <TableRow className={classes.row}>
              {teams.map((team, teamIndex) => (
                <TableCell key={team} className={classes.cell}>
                  <Button
                    startIcon={<PersonAddIcon />}
                    color="primary"
                    variant="outlined"
                    disabled={loading}
                    onClick={() => onJoin(teamIndex)}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="primary" />
                    ) : (
                      'Join'
                    )}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          )}
          {participantRows.map((participantRow, index) => (
            <TableRow key={index} className={classes.row}>
              {teams.map((team, teamIndex) => {
                const participant = participantRow[teamIndex];
                return (
                  <TableCell key={team} className={classes.cell}>
                    {participant && (
                      <ParticipantItem participant={participant} />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Skeleton variant="rect" width="100%" height="100%" />
  );
};

export default React.memo(ParticipantTable);
