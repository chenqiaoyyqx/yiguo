<?php

      header("Content-Type: text/html;charset=utf-8");
      $username = @$_REQUEST["username"];
      $password = @$_REQUEST["password"];
      if(!$username || !$password){
            die('{"state":"error","errorType":"参数不能为空","stateCode":"2"}');
      }
      require("./connect.php");
      $select_query = "SELECT username FROM user_list";
      $select_res = mysql_query($select_query);
      while($row = mysql_fetch_array($select_res)){
            if($username === $row["username"]){
                  mysql_close($con);
                  die('{"state":"error","stateCode":"用户名重复","errorState":"4"}');
            }
      }
      $password = md5($password);
      $inster_query = "INSERT INTO user_list (username , password) VALUES ('$username','$password')";

      $insert_res =  mysql_query($inster_query);

      if($insert_res){
            die('{"state":"success","errorType":"null","stateCode":"1"}');
      }else{
            die('{"state":"error","errorType":"数据库写入失败","stateCode":"5"}');
      }
?>