import { Avatar, Divider, Grid, Paper } from "@mui/material";
import moment from "moment";
import React from "react";
import ReplyHealthReport from "../Admin/AdminCRUD/ReplyHealthReport";

export const Comments = ({ reports }) => {
  return (
    <>
      <Paper style={{ padding: "40px 20px" }}>
        {reports &&
          reports.map((report) => (
            <>
              <Grid container wrap="nowrap" spacing={2} key={report._id}>
                <Grid item>
                  <Avatar
                    alt={
                      report.user[0].first_name + " " + report.user[0].last_name
                    }
                    src={report.user[0].avatar.url}
                  />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4
                    style={{
                      margin: 0,
                      textAlign: "left",
                      textTransform: "uppercase",
                    }}
                  >
                    {report.user[0].first_name + " " + report.user[0].last_name}
                  </h4>
                  <p style={{ textAlign: "left" }}>{report.description}</p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    posted{" "}
                    {moment(report.createdAt).format("MM-DD-YY  hh:mm a")}
                    <ReplyHealthReport reports={report} />
                  </p>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar
                        alt={
                          report.user[0].first_name +
                          " " +
                          report.user[0].last_name
                        }
                      />
                    </Grid>
                    {report.reply.length > 0 && (
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>
                          {report.admin[0].admin_name} (Admin)
                        </h4>
                        <p style={{ textAlign: "left" }}>
                          {report.reply[0].text}{" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                          posted{" "}
                          {moment(report.reply[0].createdAt).format(
                            "MM-DD-YY  hh:mm a"
                          )}
                        </p>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            </>
          ))}
      </Paper>
    </>
  );
};
