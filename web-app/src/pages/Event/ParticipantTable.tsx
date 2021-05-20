import React, { useMemo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { Participant } from '../../types';
import ParticipantItem from './ParticipantItem';
import TeamHeader from './TeamHeader';
import JoinTeamButton from './JoinTeamButton';
import useStyles from './ParticipantTable.styles';

interface ParticipantTableProps {
  participants?: Participant[];
  teams: string[];
  isParticipant: boolean;
  onJoin: (team: number) => void;
  loading: boolean;
  capacity: number;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  participants,
  teams,
  isParticipant,
  onJoin,
  loading,
  capacity,
}) => {
  const classes = useStyles();

  const teamsWithParticipants = useMemo(() => {
    const initial = Array.from(Array(teams.length)).map(
      () => [] as Participant[]
    );
    return participants
      ? participants.reduce((acc, participant) => {
          acc[participant.team || 0].push(participant);
          return acc;
        }, initial)
      : initial;
  }, [participants, teams]);

  const participantsPerTeam =
    teams.length > 0 ? Math.floor(capacity / teams.length) : 0;

  return participants ? (
    <Grid
      container
      direction="row"
      justify="space-between"
      spacing={1}
      className={classes.tableContainer}
    >
      {teams.map((teamName, teamIndex) => (
        <>
          <Grid key={teamName} item>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TeamHeader
                  name={teamName}
                  participants={teamsWithParticipants[teamIndex].length}
                  capacity={participantsPerTeam}
                />
              </Grid>
              <Grid item>
                <List>
                  {Array.from(Array(participantsPerTeam)).map(
                    (_, participantIndex) => {
                      const participant =
                        teamsWithParticipants[teamIndex][participantIndex];
                      return (
                        <Grid key={participantIndex} item>
                          <ParticipantItem
                            user={participant?.user}
                            index={participantIndex}
                          />
                        </Grid>
                      );
                    }
                  )}
                </List>
              </Grid>
              {!isParticipant && (
                <Grid item>
                  <JoinTeamButton
                    participants={teamsWithParticipants[teamIndex].length}
                    capacity={participantsPerTeam}
                    onJoin={() => onJoin(teamIndex)}
                    loading={loading}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          {teamIndex !== teams.length - 1 && (
            <Divider
              key={`divider.${teamName}`}
              flexItem
              orientation="vertical"
            />
          )}
        </>
      ))}
    </Grid>
  ) : (
    <Skeleton variant="rect" width="100%" height="100%" />
  );
};

export default React.memo(ParticipantTable);
