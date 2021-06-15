

function Home(props) {
    const classes=`${props.className ? props.className : ''}`;

    return (
        <div className={classes}>
          <h1>Homepage</h1>
        </div>
    )
}

export default Home;