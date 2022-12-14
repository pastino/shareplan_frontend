import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import styles from "../../../../../styles";
import contents from "../../../../../contents";
import ExpoIcon from "../../../../../components/ExpoIcon";

const ToDoListText = ({ item, touchable, today, division }) => {
  const startDate = item.startDate;
  const startTime = item.startTime;
  const endDate = item.endDate;
  const endTime = item.endTime;
  const strDate = item.strTime;
  const complete = item.complete;
  const history = item.posts;

  const splitStart = startDate.split("-");
  const diffStart = moment([splitStart[0], splitStart[1] - 1, splitStart[2]]);
  const splitEnd = endDate.split("-");
  const diffEnd = moment([splitEnd[0], splitEnd[1] - 1, splitEnd[2]]);
  const splitStr = strDate ? strDate.split("-") : null;
  const diffStr = splitStr
    ? moment([splitStr[0], splitStr[1] - 1, splitStr[2]])
    : null;

  const diffTotalDay = diffEnd.diff(diffStart, "days") + 1;
  const diffStrDay = diffStr ? diffStr.diff(diffStart, "days") + 1 : null;

  const beforeConfirmData =
    startDate >= moment(new Date()).format("YYYY-MM-DD") ? true : false;

  const beforeStartConfirm =
    beforeConfirmData === true && startTime
      ? startTime > moment(new Date()).format("HH:mm")
        ? true
        : false
      : null;

  const test = new Date();
  const ttt = startTime !== null ? startTime.split(":")[0] : null;
  const ttttt = startTime !== null ? startTime.split(":")[1] : null;

  const mm = moment([
    test.getFullYear(),
    test.getMonth(),
    test.getDate(),
    ttt,
    ttttt,
  ]);

  const a = moment(mm);

  const b = moment();

  const minuteCreated = a.diff(b, "minutes") + 1; // 44700
  const hourCreated = a.diff(b, "hours"); // 745
  const dayCreated = a.diff(b, "days"); // 31
  const weekCreated = a.diff(b, "weeks"); // 4
  const monthCreated = a.diff(b, "months");
  const yearCreated = a.diff(b, "years");

  const ccc = endTime !== null ? endTime.split(":")[0] : "24";
  const ccccc = endTime !== null ? endTime.split(":")[1] : "00";
  const cc = moment([splitEnd[0], splitEnd[1] - 1, splitEnd[2], ccc, ccccc]);

  const c = moment(cc);
  const d = moment();

  const cMinuteCreated = c.diff(d, "minutes"); // 44700
  const cGourCreated = c.diff(d, "hours"); // 745
  const cDayCreated = c.diff(d, "days"); // 31
  const cWeekCreated = c.diff(d, "weeks"); // 4
  const cMonthCreated = c.diff(d, "months");
  const cYearCreated = c.diff(d, "years");

  const color = item.color;
  const memo = item.memo;

  return (
    <View style={{}}>
      <View
        style={{
          paddingBottom: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginTop: complete === true ? 10 : null,
          }}
        >
          <ExpoIcon
            name={"bullseye-arrow"}
            color={styles.darkGreyColor}
            size={17}
          />

          <Text
            style={{
              paddingLeft: 7,
              fontSize: 10,
              fontWeight: "700",
              color: styles.darkGreyColor,
            }}
          >
            {item && item.goal !== null
              ? item && item.goal && item.goal.goalText
              : "???"}
          </Text>
        </View>
        {complete === true ? null : (
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
            }}
          >
            {beforeStartConfirm ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <ExpoIcon
                  name={"clock-start"}
                  size={17}
                  color={styles.BlueText}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 10,
                      color: styles.BlueText,
                      fontWeight: "700",
                    }}
                  >
                    {minuteCreated < 60
                      ? `${minuteCreated}??? ???`
                      : minuteCreated === 60 || minuteCreated === 61
                      ? "1?????? ???"
                      : hourCreated < 24
                      ? `${hourCreated}?????? ???`
                      : dayCreated < 7
                      ? `${dayCreated}??? ???`
                      : weekCreated < 5
                      ? `${weekCreated}??? ???`
                      : monthCreated < 12
                      ? `${monthCreated}?????? ???`
                      : `${yearCreated}??? ???`}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 7,
                      color: styles.darkGreyColor,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    Start
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <ExpoIcon
                  name={"clock-end"}
                  size={17}
                  color={
                    cMinuteCreated < 0
                      ? styles.TextWine
                      : styles.TextForestGreen
                  }
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 10,
                      color:
                        cMinuteCreated < 0
                          ? styles.TextWine
                          : styles.TextForestGreen,
                      fontWeight: "700",
                    }}
                  >
                    {cMinuteCreated < 0
                      ? cMinuteCreated > -60
                        ? `${cMinuteCreated * -1}??? ??????`
                        : cMinuteCreated === 60 || cMinuteCreated === 61
                        ? "1?????? ??????"
                        : cGourCreated > -24
                        ? `${cGourCreated * -1}?????? ??????`
                        : cDayCreated > -7
                        ? `${cDayCreated * -1}??? ??????`
                        : cWeekCreated > -5
                        ? `${cWeekCreated * -1}??? ??????`
                        : cMonthCreated > -12
                        ? `${cMonthCreated * -1}?????? ??????`
                        : `${cYearCreated * -1}??? ??????`
                      : cMinuteCreated < 60
                      ? `${cMinuteCreated}??? ???`
                      : cMinuteCreated === 60 || cMinuteCreated === 61
                      ? "1?????? ???"
                      : cGourCreated < 24
                      ? `${cGourCreated}?????? ???`
                      : cDayCreated < 7
                      ? `${cDayCreated}??? ???`
                      : cWeekCreated < 5
                      ? `${cWeekCreated}??? ???`
                      : cMonthCreated < 12
                      ? `${cMonthCreated}?????? ???`
                      : `${cYearCreated}??? ???`}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 7,
                      color: styles.darkGreyColor,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    {cMinuteCreated < 0 ? "Over" : "End"}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={{ width: contents.width / 1.15, marginTop: 7 }}>
        <Text
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            color:
              item.id < 1 || complete === true
                ? styles.darkGreyColor
                : color === "??????(??????)"
                ? "black"
                : color === "?????? ??????"
                ? styles.TextWine
                : color === "??????"
                ? styles.BlueText
                : color === "???????????? ??????"
                ? styles.TextForestGreen
                : color === "????????? ?????????"
                ? styles.TextOrangeYellow
                : color === "?????????"
                ? styles.TextLavendar
                : color === "????????? ??????"
                ? styles.TextMidiumPupple
                : color === "????????? ??????"
                ? styles.TextSkyBlue
                : color === "??????"
                ? styles.TextGold
                : null,
            fontWeight: "700",
            textDecorationLine: complete === true ? "line-through" : null,
          }}
        >
          {item.toDoList}
        </Text>
      </View>
      {division !== "download" ? (
        history === null || (history && history.length < 4) ? (
          history &&
          history.map((obj) => (
            <View
              key={obj.id}
              style={{
                flexDirection: "row",
                paddingLeft: 20,
                paddingTop: 15,

                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ExpoIcon name={"book-open"} size={17} />
                <Text style={{ fontSize: 6, fontWeight: "700" }}>????????????</Text>
              </View>
              <Text style={{ fontSize: 10, marginLeft: 10 }}>{obj.title}</Text>
            </View>
          ))
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 20,
                paddingTop: 15,
                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ExpoIcon name={"book-open"} size={17} />
                <Text style={{ fontSize: 6, fontWeight: "700" }}>????????????</Text>
              </View>
              <Text style={{ fontSize: 10, marginLeft: 10 }}>
                {history[0].title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 20,
                paddingTop: 15,
                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ExpoIcon name={"book-open"} size={17} />
                <Text style={{ fontSize: 6, fontWeight: "700" }}>????????????</Text>
              </View>
              <Text style={{ fontSize: 10, marginLeft: 10 }}>
                {history[1].title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 20,
                paddingTop: 15,

                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ExpoIcon name={"book-open"} size={17} />
                <Text style={{ fontSize: 6, fontWeight: "700" }}>????????????</Text>
              </View>
              <Text style={{ fontSize: 10, marginLeft: 10 }}>
                {history[2].title}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExpoIcon
                  name={"plus"}
                  size={20}
                  color={styles.darkGreyColor}
                />
                <Text style={{ color: styles.darkGreyColor }}>
                  {history.length - 3}
                </Text>
              </View>
            </View>
          </>
        )
      ) : null}

      {division === "download" ? (
        <View style={{ marginBottom: 7 }} />
      ) : startDate === endDate ? (
        <View style={{}}>
          <Text></Text>
        </View>
      ) : (
        <View
          style={{
            width: contents.width / 1.15,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              width: (contents.width / 1.16) * (diffStrDay / diffTotalDay),
              height: 2,
              backgroundColor: styles.darkGreyColor,
              borderBottomRightRadius: diffStrDay === diffTotalDay ? 10 : null,
              borderBottomLeftRadius: 10,
            }}
          ></View>
        </View>
      )}
    </View>
  );
};

export default ToDoListText;
